export interface Menu {
    id?: string;
    title?: string;
    icon?: string;
    url?: string;
    role?: string;
    active?: boolean;
    isAdmin?:boolean;
    sousMenu?: Array<Menu>;
    visibleRoles?: string[]; 
  }