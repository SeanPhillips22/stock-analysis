import ExcellentExport from 'excellentexport';
import { navState } from 'state/navState';

interface Props {
	title: string;
	type: 'csv' | 'xlsx';
	data: any;
	fixValuef?: (n: any) => any;
	isTable: boolean;
}

export default function Download({
	title,
	type,
	data,
	isTable,
	fixValuef,
}: Props) {
	const path = navState((state) => state.path);

	const fileName = `${path.one}${path.two ? '-' + path.two : ''}${
		path.three ? '-' + path.three : ''
	}`;

	const returnArray = isTable
		? [
				{
					name: 'Export',

					from: { table: data },
					fixValue: fixValuef,
				},
		  ]
		: [
				{
					name: 'Export',

					from: { array: data },
				},
		  ];

	function download(type: 'csv' | 'xlsx') {
		return ExcellentExport.convert(
			{
				openAsDownload: true,
				filename: fileName,
				format: type,
			},
			returnArray
		);
	}

	return (
		<div
			className="text-gray-700 hover:bg-gray-100 block px-4 py-2 text-sm cursor-pointer"
			onClick={() => {
				download(type);
			}}
		>
			{title}
		</div>
	);
}
