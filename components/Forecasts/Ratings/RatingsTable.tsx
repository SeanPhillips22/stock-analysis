export function RatingsTable() {
	return (
		<div className="mt-5 text-center">
			<table className="w-full text-right text-smaller">
				<thead>
					<tr className="border-b border-gray-200 font-normal">
						<th className="text-left font-semibold">Rating</th>
						<th className="font-semibold">Sep 21</th>
						<th className="font-semibold">Oct 21</th>
						<th className="font-semibold">Nov 21</th>
						<th className="font-semibold">Dec 21</th>
						<th className="font-semibold">Jan 22</th>
						<th className="font-semibold">Feb 22</th>
					</tr>
				</thead>
				<tbody>
					<tr className="border-b border-gray-200">
						<td className="text-left">Strong Buy</td>
						<td>16</td>
						<td>16</td>
						<td>16</td>
						<td>16</td>
						<td>17</td>
						<td>17</td>
					</tr>
					<tr className="border-b border-gray-200">
						<td className="text-left">Buy</td>
						<td>23</td>
						<td>23</td>
						<td>24</td>
						<td>24</td>
						<td>25</td>
						<td>25</td>
					</tr>
					<tr className="border-b border-gray-200">
						<td className="text-left">Hold</td>
						<td>8</td>
						<td>9</td>
						<td>8</td>
						<td>8</td>
						<td>7</td>
						<td>8</td>
					</tr>
					<tr className="border-b border-gray-200">
						<td className="text-left">Sell</td>
						<td>0</td>
						<td>0</td>
						<td>0</td>
						<td>0</td>
						<td>0</td>
						<td>0</td>
					</tr>
					<tr>
						<td className="text-left">Strong Sell</td>
						<td>1</td>
						<td>0</td>
						<td>0</td>
						<td>0</td>
						<td>0</td>
						<td>0</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}
