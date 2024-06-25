// Interfaces for different email data types
interface ForgotPasswordData {
  reset_password_url: string;
}

interface WelcomeData {
  username: string;
}

interface OrderConfirmationData {
  orderId: string;
  orderDate: string;
}

// Enum to manage template keys
export enum TemplateKey {
  ForgotPassword = 'forgotPassword',
  Welcome = 'welcome',
  OrderConfirmation = 'orderConfirmation',
}

// Generic interface for template data
interface TemplateInterface<T> {
  id: string;
  data: T;
}

// Mapping of template keys to their respective data types
export type Templates = {
  [TemplateKey.ForgotPassword]: TemplateInterface<ForgotPasswordData>;
  [TemplateKey.Welcome]: TemplateInterface<WelcomeData>;
  [TemplateKey.OrderConfirmation]: TemplateInterface<OrderConfirmationData>;
};

// Template configurations
export const templates: Templates = {
  [TemplateKey.ForgotPassword]: {
    id: 'd-52d76971b1214cc69badd0ddf21082fc',
    data: {} as ForgotPasswordData,
  },
  [TemplateKey.Welcome]: {
    id: 'd-xxxxx',
    data: {} as WelcomeData,
  },
  [TemplateKey.OrderConfirmation]: {
    id: 'd-yyyyy',
    data: {} as OrderConfirmationData,
  },
};
