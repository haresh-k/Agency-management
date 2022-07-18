export interface Agency {
  id: number;
  name: string;
  country?: string;
  countryCode?: string;
  city?: string;
  street?: string;
  settlementCurrency?: string;
  contactPerson?: string;
}
