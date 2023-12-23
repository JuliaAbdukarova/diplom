import styled from "styled-components"
import { useEffect, useState, forwardRef, useImperativeHandle, useRef } from "react";

const useLoadingCount = (initialCount) => {
    const [loadingCount, setLoadingCount] = useState(initialCount);

    const decrementLoadingCount = () => {
        setLoadingCount((prevCount) => prevCount - 1);
    };

    return {
        loadingCount,
        decrementLoadingCount,
        setLoadingCount
    };
};

export const useParentComponent = () => {
        const loaderRef = useRef();

        const decrementLoadingCount = () => {
            if (loaderRef.current) {
                loaderRef.current.decrementLoadingCount();
            }
        };

        const setLoadingCount = (count) => {
            if (loaderRef.current) {
                loaderRef.current.setLoadingCount(count);
            }
        };

        return { loaderRef, decrementLoadingCount, setLoadingCount};
};

const LoaderContainer = forwardRef(({ className, count }, ref) => {
    const { loadingCount, decrementLoadingCount, setLoadingCount } = useLoadingCount(count);

    useEffect(() => {
        if (loadingCount === 0) {
            console.log("Loading is complete");
        }
    }, [loadingCount]);

    useImperativeHandle(ref, () => ({
        decrementLoadingCount,
        setLoadingCount
    }));

    return loadingCount > 0? <div className={className}> Загрузка...</div> : null;
});

export const Loader = styled (LoaderContainer)`
    background-color: yellow;
    position: fixed;
    top: 20;
    left: 20;
    right: auto;
    bottom: auto;
    z-index: 10;
`
