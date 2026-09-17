import React from 'react';

export interface Option {
  id: string;
  label: string;
}

export interface Decision {
  id: string;
  title: string;
  options: Option[];
  selectedOptionId: string | null;
  createdAt: number;
}

export interface SidebarProps {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
  activeView: string | 'create' | null;
  decisions: Decision[];
  onSetCreateView: () => void;
  onSelectDecision: (id: string) => void;
  onDeleteDecision: (e: React.MouseEvent, id: string) => void;
}

export interface MobileTopBarProps {
  toggleSidebar: () => void;
  title: string;
}

export interface DecisionListProps {
  decisions: Decision[];
  activeView: string | 'create' | null;
  onSelect: (id: string) => void;
  onDelete: (e: React.MouseEvent, id: string) => void;
}

export interface DecisionListItemProps {
  decision: Decision;
  isActive: boolean;
  onSelect: (id: string) => void;
  onDelete: (e: React.MouseEvent, id: string) => void;
}

export interface DecisionDetailProps {
  decision: Decision;
  onSelectOption: (decisionId: string, optionId: string) => void;
}

export interface DecisionFormProps {
  onCreate: (title: string, optionLabels: string[]) => void;
  onCancel: () => void;
}

export interface OptionItemProps {
  option: Option;
  isSelected: boolean;
  isDecisionMade: boolean;
  onSelect: (optionId: string) => void;
}