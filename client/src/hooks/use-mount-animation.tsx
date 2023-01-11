import React from "react";

type ComponentProps = { children: JSX.Element | JSX.Element[] };

export interface UseMountAnimation {
  Component: React.FC<ComponentProps>;
  handleStartAnimation: () => void;
  handleStopAnimation: (callback?: () => void) => void;
  isMounted: boolean;
}

export const useMountAnimation = (
  styles: {
    readonly [key: string]: string;
  },
  initial: boolean = false
): UseMountAnimation => {
  const componentRef = React.useRef({} as HTMLDivElement);
  const [isMounted, setIsMounted] = React.useState(initial);
  const [isVisible, setIsVisible] = React.useState(initial);

  const handleStartAnimation = () => {
    setIsMounted(true);
    setIsVisible(true);
  };

  const handleStopAnimation = (callback?: () => void) => {
    const listener = callback ? callback : () => {};
    componentRef.current.addEventListener("animationend", listener);
    setIsMounted(false);
    return () => componentRef.current.removeEventListener("animationend", listener);
  };

  const Component: React.FC<ComponentProps> = ({ children }) => {
    return isVisible ? (
      <div
        className={`${styles["animated_component"]} ${isMounted ? styles["mounted"] : ""}`}
        onAnimationEnd={() => !isMounted && setIsVisible(false)}
        ref={componentRef}
      >
        {children}
      </div>
    ) : null;
  };

  return {
    Component,
    handleStartAnimation,
    handleStopAnimation,
    isMounted
  };
};
