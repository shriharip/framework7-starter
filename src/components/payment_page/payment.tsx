import { Block, ListInput, Icon, Range, List } from "framework7-react";
import { Fragment } from "react/jsx-runtime";
import ReactSwipeButton from "./slider"



export const PaymentBlock = () => {
	return (

		<Fragment>

			<div className="mb6">
				<Block strong inset >

					<h2 className="tc">You are paying</h2>
					<h1 className="tc"> DKK 100.00</h1>
				</Block>
			</div>


			{/* <List strongIos dividersIos insetIos>
					<ListInput className="" input={false}>

						<Range scale className="" slot="input" value={0} min={0} max={50} step={10} />
					</ListInput>
				</List> */}

			<div className="w-80 ma4">
				<ReactSwipeButton />
			</div>



		</Fragment>

	);
}