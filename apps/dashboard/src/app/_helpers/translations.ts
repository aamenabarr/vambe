import { BuyerSentiment, CustomerPain, Industry, PurchaseIntention, PurchaseObjection, TechnologicalMaturity, VambeDiscoverySource } from 'domain-clean/enums'
import {
  buyerSentimentTranslation,
  customerPainTranslation,
  industryTranslation,
  purchaseIntentionTranslation,
  purchaseObjectionTranslation,
  technologicalMaturityTranslation,
  vambeDiscoverySourceTranslation,
} from 'translations/enums'

export const translateBuyerSentiment = (value: string): string => {
  return buyerSentimentTranslation[value as BuyerSentiment] || value
}

export const translateIndustry = (value: string): string => {
  return industryTranslation[value as Industry] || value
}

export const translatePurchaseIntention = (value: string): string => {
  return purchaseIntentionTranslation[value as PurchaseIntention] || value
}

export const translateTechMaturity = (value: string): string => {
  return technologicalMaturityTranslation[value as TechnologicalMaturity] || value
}

export const translateDiscoverySource = (value: string): string => {
  return vambeDiscoverySourceTranslation[value as VambeDiscoverySource] || value
}

export const translateObjection = (value: string): string => {
  return purchaseObjectionTranslation[value as PurchaseObjection] || value
}

export const translateCustomerPain = (value: string): string => {
  return customerPainTranslation[value as CustomerPain] || value
}
