export interface Overview {
	revenue: string;
	netIncome: string;
	sharesOut: string;
	eps: string;
	peRatio: string;
	forwardPE: string;
	dividend: string;
	exDividendDate: string;
	marketCap: string;
	volume: string;
	open: string;
	close: string;
	rangeDay: string;
	range52w: string;
	beta: string;
	analysts: string;
	target: string;
	earningsDate: string;
	description: string;
	infoTable: {
		[key: string]: string[];
	};
	financialIntro: string;
	financialChart: string;
	analystIntro: string;
	analystTarget: string;
	analystChart: string;
}
