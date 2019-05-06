import React from "react";

export function MainNav() {
	return (
		<nav
			className="uk-navbar-container"
			uk-navbar="boundary-align: true; align: center;"
		>
			<div className="uk-navbar-left">
				<ul className="uk-navbar-nav">
					<li>
						<a href="#">
							<img
								src="https://s3.us-east-2.amazonaws.com/avobuild/logos/favicon.png"
								alt="Avobuild logo"
								style={{ height: "3.5em", marginRight: "0.5rem" }}
							/>
							Order Delivery System
						</a>
					</li>
				</ul>
			</div>

			<div className="uk-navbar-right">
				<ul className="uk-navbar-nav">
					<li>
						<a href="#">History</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export function BackNav(props) {
	return (
		<nav
			className="uk-navbar-container"
			uk-navbar="boundary-align: true; align: center;"
		>
			<div className="uk-navbar-left">
				<ul className="uk-navbar-nav">
					<li>
						<a
							href="#"
							// style={{ fontSize: "0.8em" }}
							onClick={(type, payload) => props.view("orders", null)}
						>
							<span uk-icon="arrow-left" style={{ paddingLeft: "1rem" }} />
							Back
						</a>
					</li>
				</ul>
			</div>

			<div className="uk-navbar-right">
				<ul className="uk-navbar-nav">
					<li>
						<a href="#">
							<img
								src="https://s3.us-east-2.amazonaws.com/avobuild/logos/favicon.png"
								alt="Avobuild logo"
								style={{ height: "3.5em" }}
							/>
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}
