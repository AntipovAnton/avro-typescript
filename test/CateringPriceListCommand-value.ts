export interface SagaId {
	identity: string;
}

export interface SagaIdUnionWrap {
	'com.vistajet.msp.cqrs.core.saga.SagaId': SagaId;
}

export interface ActivityKey {
	value: string;
}

export interface ActivityFlowId {
	groupId: number;
	activityKey: ActivityKey;
}

export interface ActivityFlowIdUnionWrap {
	'com.vistajet.msp.cqrs.core.saga.ActivityFlowId': ActivityFlowId;
}

export interface CorrelationId {
	value: string;
}

export interface CateringPriceListId {
	value: string;
}

export interface LongUnionWrap {
	long: number;
}

export interface LongUnionWrap {
	long: number;
}

export interface CompanyId {
	value: string;
}

export interface AirportId {
	value: string;
}

export interface CurrencyId {
	value: string;
}

export interface UserId {
	value: string;
}

export interface CreateCateringPriceListCommand {
	identity: CateringPriceListId;
	validFrom?: null | LongUnionWrap;
	validTo?: null | LongUnionWrap;
	name: string;
	sourceDocument: number[];
	companyId: CompanyId;
	airportIds: AirportId[];
	currencyId: CurrencyId;
	modifiedAt: number;
	modifiedBy: UserId;
	removed: boolean;
}

export interface CreateCateringPriceListCommandUnionWrap {
	'com.vistajet.msp.catering.serviceprovider.context.cateringpricelist.command.CreateCateringPriceListCommand': CreateCateringPriceListCommand;
}

export interface LongUnionWrap {
	long: number;
}

export interface LongUnionWrap {
	long: number;
}

export interface AmendCateringPriceListDetailsCommand {
	identity: CateringPriceListId;
	name: string;
	sourceDocument: number[];
	airportIds: AirportId[];
	currencyId: CurrencyId;
	validFrom?: null | LongUnionWrap;
	validTo?: null | LongUnionWrap;
	modifiedAt: number;
	modifiedBy: UserId;
}

export interface AmendCateringPriceListDetailsCommandUnionWrap {
	'com.vistajet.msp.catering.serviceprovider.context.cateringpricelist.command.AmendCateringPriceListDetailsCommand': AmendCateringPriceListDetailsCommand;
}

export interface RemoveCateringPriceListCommand {
	identity: CateringPriceListId;
	modifiedAt: number;
	modifiedBy: UserId;
	removed: boolean;
}

export interface RemoveCateringPriceListCommandUnionWrap {
	'com.vistajet.msp.catering.serviceprovider.context.cateringpricelist.command.RemoveCateringPriceListCommand': RemoveCateringPriceListCommand;
}

export interface DomainCommandMessage {
	timeToLive: number;
	sagaId?: null | SagaIdUnionWrap;
	activityFlowId?: null | ActivityFlowIdUnionWrap;
	correlationId: CorrelationId;
	timestamp: number;
	domainObject: CreateCateringPriceListCommandUnionWrap | AmendCateringPriceListDetailsCommandUnionWrap | RemoveCateringPriceListCommandUnionWrap;
}
