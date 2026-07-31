import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function useNavTheme(defaultTheme = 'dark') {
    const [theme, setTheme] = useState(defaultTheme)
    const { pathname } = useLocation()

    useEffect(() => {
        let intersectionObserver = null
        let mutationObserver = null

        setTheme(defaultTheme)

        const setupObserver = () => {
            const sections = Array.from(
                document.querySelectorAll('[data-navbar-theme]')
            )

            if (sections.length === 0) {
                return
            }

            // Prevent duplicate observers
            intersectionObserver?.disconnect()

            const navHeight =
                parseInt(
                    getComputedStyle(document.documentElement)
                        .getPropertyValue('--navbar-height')
                ) || 80

            intersectionObserver = new IntersectionObserver(
                (entries) => {
                    const visible = entries
                        .filter((entry) => entry.isIntersecting)
                        .sort(
                            (a, b) =>
                                b.intersectionRatio -
                                a.intersectionRatio
                        )

                    if (visible.length > 0) {
                        setTheme(
                            visible[0].target.dataset.navbarTheme
                        )
                    }
                },
                {
                    rootMargin: `-${navHeight}px 0px -${
                        Math.max(
                            window.innerHeight - navHeight - 1,
                            0
                        )
                    }px 0px`,
                    threshold: 0,
                }
            )

            sections.forEach((section) =>
                intersectionObserver.observe(section)
            )
        }


        // Initial attempt after render
        const timeout = setTimeout(() => {
            setupObserver()
        }, 100)


        // Watches for sections that appear later
        // (API-loaded content, lazy components, etc.)
        mutationObserver = new MutationObserver(() => {
            setupObserver()
        })

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true,
        })


        return () => {
            clearTimeout(timeout)
            intersectionObserver?.disconnect()
            mutationObserver?.disconnect()
        }

    }, [pathname, defaultTheme])


    return theme
}

export default useNavTheme