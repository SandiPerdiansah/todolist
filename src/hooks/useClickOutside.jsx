import {useEffect} from "react";

export const useClickOutside = ({targetElement, targetingElement, action}) => {
    useEffect(() => {
        const handleCLickOutside = (e) => {
            if (
                targetElement.current &&
                !targetElement.current.contains(e.target) &&
                targetingElement.current &&
                !targetingElement.current.contains(e.target)
            ) {
                action();
            }
        };

        if (targetElement.current && targetingElement.current) {
            document.addEventListener('click', handleCLickOutside);
        }

        return () => {
            if (targetElement.current && targetingElement.current) {
                document.removeEventListener('click', handleCLickOutside);
            }
        }
    }, [targetElement, targetingElement, action]);
}