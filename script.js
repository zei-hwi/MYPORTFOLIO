document.addEventListener("DOMContentLoaded", () => {
	const unavailableLinks = document.querySelectorAll('a[href="#services"], a[href="#projects"]');
	const unavailableModal = document.getElementById("unavailableModal");
	const closeUnavailableModal = document.getElementById("closeUnavailableModal");
	const navbar = document.querySelector(".navbar");
	const motionTargets = document.querySelectorAll(
		".hero .introduction, .section-heading, .about-card, .skill-card"
	);
	const skillTooltipTargets = document.querySelectorAll(".skill-tags span[placeholder]");
	let lastScrollY = window.scrollY;

	const openModal = () => {
		unavailableModal.classList.add("is-open");
		unavailableModal.setAttribute("aria-hidden", "false");
		document.body.classList.add("modal-open");
		closeUnavailableModal.focus();
	};

	const closeModal = () => {
		unavailableModal.classList.remove("is-open");
		unavailableModal.setAttribute("aria-hidden", "true");
		document.body.classList.remove("modal-open");
	};

	const updateNavbarMotion = () => {
		const currentScrollY = window.scrollY;
		const isScrollingDown = currentScrollY > lastScrollY;

		navbar.classList.toggle("is-scrolled", currentScrollY > 12);
		navbar.classList.toggle("is-scrolling-down", isScrollingDown && currentScrollY > 12);
		navbar.classList.toggle("is-scrolling-up", !isScrollingDown && currentScrollY > 12);

		lastScrollY = currentScrollY;
	};

	motionTargets.forEach((element) => {
		element.classList.add("motion-target");
	});

	skillTooltipTargets.forEach((skillTag) => {
		const tooltipText = skillTag.getAttribute("placeholder");
		if (tooltipText) {
			skillTag.setAttribute("data-tooltip", tooltipText);
			skillTag.classList.add("has-tooltip");
			skillTag.setAttribute("tabindex", "0");
		}
	});

	if ("IntersectionObserver" in window) {
		const observer = new IntersectionObserver(
			(entries, observerInstance) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
						observerInstance.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0.14,
				rootMargin: "0px 0px -8% 0px",
			}
		);

		motionTargets.forEach((element) => observer.observe(element));
	} else {
		motionTargets.forEach((element) => element.classList.add("is-visible"));
	}

	updateNavbarMotion();
	window.addEventListener("scroll", updateNavbarMotion, { passive: true });

	unavailableLinks.forEach((link) => {
		link.addEventListener("click", (event) => {
			event.preventDefault();
			openModal();
		});
	});

	closeUnavailableModal.addEventListener("click", closeModal);

	unavailableModal.addEventListener("click", (event) => {
		if (event.target === unavailableModal) {
			closeModal();
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && unavailableModal.classList.contains("is-open")) {
			closeModal();
		}
	});
});
