declare module 'react-mobile-datepicker' {
  import { Component } from 'react';

  // DatePickerProps interfeysi
  interface DatePickerProps {
    isOpen: boolean;
    onSelect: (date: Date) => void;
    onCancel: () => void;
    dateConfig?: {
      year?: { format: string; caption: string; step: number };
      month?: { format: (value: Date) => string; caption: string; step: number };
      date?: { format: string; caption: string; step: number };
    };
    theme?: string;
    min?: Date;
    max?: Date;
    cancelText?: string;
    confirmText?: string;
    headerFormat?: string;
    showCaption?: boolean;
    showFooter?: boolean;
  }

  // DatePicker komponenti
  class DatePicker extends Component<DatePickerProps> {}

  export default DatePicker;
}
