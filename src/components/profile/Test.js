const Test = () => {
	window.addEventListener("DOMContentLoaded", () => {
		const tabs = document.querySelectorAll('[role="tab"]');
		const tabList = document.querySelector('[role="tablist"]');

		// Add a click event handler to each tab
		tabs.forEach((tab) => {
			tab.addEventListener("click", changeTabs);
		});

		// Enable arrow navigation between tabs in the tab list
		let tabFocus = 0;

		tabList.addEventListener("keydown", (e) => {
			// Move right
			if (e.keyCode === 40 || e.keyCode === 37) {
				tabs[tabFocus].setAttribute("tabindex", -1);
				if (e.keyCode === 40) {
					tabFocus++;
					// If we're at the end, go to the start
					if (tabFocus >= tabs.length) {
						tabFocus = 0;
					}
					// Move left
				} else if (e.keyCode === 37) {
					tabFocus--;
					// If we're at the start, move to the end
					if (tabFocus < 0) {
						tabFocus = tabs.length - 1;
					}
				}

				tabs[tabFocus].setAttribute("tabindex", 0);
				tabs[tabFocus].focus();
			}
		});
	});

	function changeTabs(e) {
		const target = e.target;
		const parent = target.parentNode;
		const grandparent = parent.parentNode;

		// Remove all current selected tabs
		parent
			.querySelectorAll('[aria-selected="true"]')
			.forEach((t) => t.setAttribute("aria-selected", false));

		// Set this tab as selected
		target.setAttribute("aria-selected", true);

		// Hide all tab panels
		grandparent
			.querySelectorAll('[role="tabpanel"]')
			.forEach((p) => p.setAttribute("hidden", true));

		// Show the selected panel
		grandparent.parentNode
			.querySelector(`#${target.getAttribute("aria-controls")}`)
			.removeAttribute("hidden");
	}

	return (
		<>
			<div class="tabs">
				<div role="tablist" aria-label="Sample Tabs">
					<button
						role="tab"
						aria-selected="true"
						aria-controls="panel-1"
						id="tab-1"
						tabindex="0"
					>
						게시물
					</button>
					<button
						role="tab"
						aria-selected="false"
						aria-controls="panel-2"
						id="tab-2"
						tabindex="-1"
					>
						비디오
					</button>
					<button
						role="tab"
						aria-selected="false"
						aria-controls="panel-3"
						id="tab-3"
						tabindex="-1"
					>
						저장됨
					</button>
					<button
						role="tab"
						aria-selected="false"
						aria-controls="panel-4"
						id="tab-4"
						tabindex="-1"
					>
						태그됨
					</button>
				</div>
				<div id="panel-1" role="tabpanel" tabindex="0" aria-labelledby="tab-1">
					<p>Content for the first panel</p>
				</div>
				<div
					id="panel-2"
					role="tabpanel"
					tabindex="0"
					aria-labelledby="tab-2"
					hidden
				>
					<p>Content for the second panel</p>
				</div>
				<div
					id="panel-3"
					role="tabpanel"
					tabindex="0"
					aria-labelledby="tab-3"
					hidden
				>
					<p>Content for the third panel</p>
				</div>
			</div>
		</>
	);
};

export default Test;
