export interface HistoryItem {
  id: string;
  title: string;
  date: string;
  isPending?: boolean;
}

export interface SidebarProps {
  isOpen: boolean;
  historyItems: HistoryItem[];
  onClose: () => void;
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export interface MobileMenuButtonProps {
  onClick: () => void;
}
