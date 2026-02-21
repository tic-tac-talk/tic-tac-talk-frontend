import React, { useState, useRef, useEffect } from 'react';
import ReplaceIcon from '@/assets/icons/replace.svg?react';
import DefaultProfileImage from '@/assets/images/default-profile.png?format=webp&as=url';
import Button from '@/components/Button';
import Input from '@/components/Input';
import useModal from '@/hooks/useModal';
import convertImageToJpeg from '@/utils/convertImageToJpeg';
import * as S from './ProfileEditModal.styles';

interface ProfileEditModalProps {
  initialNickname?: string;
  initialProfileImageUrl?: string;
  onClose: () => void;
  onSave: (
    nickname: string,
    profileImage: File | null,
    isImageDeleted: boolean,
  ) => void;
}

const ProfileEditModal = ({
  initialNickname = '',
  initialProfileImageUrl,
  onClose,
  onSave,
}: ProfileEditModalProps) => {
  const [nickname, setNickname] = useState(initialNickname);
  const [previewUrl, setPreviewUrl] = useState<string>(
    initialProfileImageUrl || DefaultProfileImage,
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { alert, toast } = useModal();

  useEffect(() => {
    if (initialNickname) {
      setNickname(initialNickname);
    }
    if (initialProfileImageUrl) {
      setPreviewUrl(initialProfileImageUrl);
    }
  }, [initialNickname, initialProfileImageUrl]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const supportedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/bmp',
        'image/heic',
        'image/heif',
      ];

      if (
        !supportedTypes.includes(file.type.toLowerCase()) &&
        !file.name.match(/\.(heic|heif)$/i)
      ) {
        toast({
          content: '지원하지 않는 형식의 이미지 파일입니다.',
        });
        return;
      }

      try {
        const processedFile = await convertImageToJpeg(file);

        setImageFile(processedFile);
        setIsImageDeleted(false);

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(processedFile);
        setIsDropdownOpen(false);
      } catch {
        toast({
          content: '이미지를 처리하는 중 오류가 발생했습니다.',
        });
      }
    }
  };

  const handleImageDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImageFile(null);
    setIsImageDeleted(true);
    setPreviewUrl(DefaultProfileImage);
    setIsDropdownOpen(false);
  };

  const handleImageChangeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleProfileImageEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nickname.trim()) {
      alert({
        title: '닉네임 입력 필요',
        content: '닉네임을 입력해 주세요.',
      });
      return;
    }

    onSave(nickname.trim(), imageFile, isImageDeleted);
  };

  return (
    <S.Container>
      <S.Title>회원 정보 수정</S.Title>
      <S.Form onSubmit={handleSubmit}>
        <S.ProfileImageSection>
          <S.ProfileImageContainer ref={dropdownRef}>
            <S.ProfileImageWrapper>
              <S.ProfileImage src={previewUrl} alt="프로필" />
              <S.ProfileImageEditButton onClick={handleProfileImageEditClick}>
                <ReplaceIcon />
              </S.ProfileImageEditButton>
            </S.ProfileImageWrapper>
            <S.ImageDropdown isOpen={isDropdownOpen}>
              <S.DropdownItem onClick={handleImageChangeClick}>
                앨범에서 선택
              </S.DropdownItem>
              <S.DropdownItem onClick={handleImageDelete}>
                기본 이미지로 변경
              </S.DropdownItem>
            </S.ImageDropdown>

            <S.ImageInput
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </S.ProfileImageContainer>
        </S.ProfileImageSection>
        <Input
          id="nickname"
          label="닉네임"
          type="text"
          value={nickname}
          onChange={handleNicknameChange}
          placeholder="닉네임을 입력하세요"
        />
        <S.ButtonsWrapper>
          <Button variant="secondary" fullWidth onClick={onClose}>
            취소
          </Button>
          <Button type="submit" fullWidth>
            저장
          </Button>
        </S.ButtonsWrapper>
      </S.Form>
    </S.Container>
  );
};

export default ProfileEditModal;
