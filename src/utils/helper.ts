export const scrollToSection = (goTo: string): void => {
    const element = document.querySelector("#" + goTo) as HTMLElement | null;
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
};
