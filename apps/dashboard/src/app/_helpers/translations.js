import { buyerSentimentTranslation, customerPainTranslation, industryTranslation, purchaseIntentionTranslation, purchaseObjectionTranslation, technologicalMaturityTranslation, vambeDiscoverySourceTranslation, } from 'translations/enums';
export const translateBuyerSentiment = (value) => {
    return buyerSentimentTranslation[value] || value;
};
export const translateIndustry = (value) => {
    return industryTranslation[value] || value;
};
export const translatePurchaseIntention = (value) => {
    return purchaseIntentionTranslation[value] || value;
};
export const translateTechMaturity = (value) => {
    return technologicalMaturityTranslation[value] || value;
};
export const translateDiscoverySource = (value) => {
    return vambeDiscoverySourceTranslation[value] || value;
};
export const translateObjection = (value) => {
    return purchaseObjectionTranslation[value] || value;
};
export const translateCustomerPain = (value) => {
    return customerPainTranslation[value] || value;
};
