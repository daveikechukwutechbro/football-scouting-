export interface Trial {
  id: string;
  title: string;
  location: string;
  date: string;
  positions: string[];
  deadline: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  quote: string;
  outcome: string;
  initials: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface StepProps {
  data: any;
  updateData: (fields: Record<string, any>) => void;
  errors: Record<string, string>;
}
