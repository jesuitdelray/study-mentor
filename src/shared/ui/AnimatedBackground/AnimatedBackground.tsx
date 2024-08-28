import React, { ReactNode, useEffect, useRef } from "react"
import { TweenLite, Circ } from "gsap"
import styles from "./AnimatedBackground.module.scss"

type Point = {
    x: number
    y: number
    originX: number
    originY: number
    closest: Point[]
    circle: Circle
    active?: number
}

type Circle = {
    point: Point
    radius: number
    color: string
    active: number

    draw: (ctx: CanvasRenderingContext2D) => void
}

function AnimatedHeader() {
    const headerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    let points: Point[] = []
    let animateHeader: boolean = true
    let target = { x: 0, y: 0 }

    useEffect(() => {
        const initHeader = () => {
            const width = window.innerWidth
            const height = window.innerHeight - 71
            target = { x: width / 2, y: height / 2 }

            const largeHeader = headerRef.current
            if (largeHeader) {
                largeHeader.style.height = `${height}px`
            }

            const canvas = canvasRef.current
            if (canvas) {
                canvas.width = width
                canvas.height = height
                const ctx = canvas.getContext("2d")
                if (ctx) {
                    createPoints(width, height, ctx)
                    initAnimation(ctx)
                    addListeners()
                }
            }
        }

        initHeader()
    }, [])

    const createPoints = (width: number, height: number, ctx: CanvasRenderingContext2D) => {
        for (let x = 0; x < width; x = x + width / 20) {
            for (let y = 0; y < height; y = y + height / 20) {
                const px = x + (Math.random() * width) / 20
                const py = y + (Math.random() * height) / 20
                const point: Point = {
                    x: px,
                    y: py,
                    originX: px,
                    originY: py,
                    closest: [],
                    circle: new Circle(
                        {
                            x: px,
                            y: py,
                            originX: px,
                            originY: py,
                            closest: [],
                        } as any,
                        2 + Math.random() * 2,
                        "rgba(255,255,255,0.3)"
                    ),
                }
                points.push(point)
            }
        }
        points.forEach(p1 => findClosestPoints(p1, points))
        points.forEach(point => shiftPoint(point))
    }

    const findClosestPoints = (p1: Point, points: Point[]) => {
        for (const p2 of points) {
            if (p1 !== p2) {
                const placed =
                    p1.closest.length < 5 ||
                    p1.closest.some(pc => getDistance(p1, p2) < getDistance(p1, pc))
                if (placed) {
                    p1.closest.push(p2)
                    p1.closest.sort((a, b) => getDistance(p1, a) - getDistance(p1, b))
                    p1.closest = p1.closest.slice(0, 5)
                }
            }
        }
    }

    const getDistance = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
    }

    const initAnimation = (ctx: CanvasRenderingContext2D) => {
        const animate = () => {
            if (animateHeader) {
                ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
                points.forEach(point => {
                    if (Math.abs(getDistance(target, point)) < 4000) {
                        point.active = 0.3
                        point.circle.active = 0.6
                    } else if (Math.abs(getDistance(target, point)) < 20000) {
                        point.active = 0.1
                        point.circle.active = 0.3
                    } else if (Math.abs(getDistance(target, point)) < 40000) {
                        point.active = 0.02
                        point.circle.active = 0.1
                    } else {
                        point.active = 0
                        point.circle.active = 0
                    }

                    drawLines(point, ctx)
                    point.circle.draw(ctx)
                })
            }
            requestAnimationFrame(animate)
        }
        animate()
    }

    const drawLines = (point: Point, ctx: CanvasRenderingContext2D) => {
        if (!point.active) return
        point.closest.forEach(closestPoint => {
            ctx.beginPath()
            ctx.moveTo(point.x, point.y)
            ctx.lineTo(closestPoint.x, closestPoint.y)
            ctx.strokeStyle = `rgba(156,217,249,${point.active})`
            ctx.stroke()
        })
    }

    class Circle {
        point: Point
        radius: number
        color: string
        active: number

        constructor(point: Point, radius: number, color: string) {
            this.point = point
            this.radius = radius
            this.color = color
            this.active = 0
        }

        draw = (ctx: CanvasRenderingContext2D) => {
            if (!this.active) return
            ctx.beginPath()
            ctx.arc(this.point.x, this.point.y, this.radius, 0, 2 * Math.PI, false)
            ctx.fillStyle = `rgba(156,217,249,${this.active})`
            ctx.fill()
        }
    }

    const shiftPoint = (point: Point) => {
        TweenLite.to(point, 1 + 1 * Math.random(), {
            x: point.originX - 50 + Math.random() * 100,
            y: point.originY - 50 + Math.random() * 100,
            ease: Circ.easeInOut,
            onUpdate: () => {
                point.circle.point = point
            },
            onComplete: () => {
                shiftPoint(point)
            },
        })
    }

    const addListeners = () => {
        window.addEventListener("mousemove", mouseMove)
        window.addEventListener("scroll", scrollCheck)
        window.addEventListener("resize", () => {
            const width = window.innerWidth
            const height = window.innerHeight
            const largeHeader = headerRef.current
            if (largeHeader) {
                largeHeader.style.height = `${height}px`
            }

            const canvas = canvasRef.current
            if (canvas) {
                canvas.width = width
                canvas.height = height
            }
        })
    }

    const mouseMove = (e: MouseEvent) => {
        const canvas = canvasRef.current
        let posx = e.pageX
        let posy = e.pageY

        if (canvas) {
            const rect = canvas.getBoundingClientRect()
            posx = e.clientX - rect.left
            posy = e.clientY - rect.top
        }

        target.x = posx
        target.y = posy
    }

    const scrollCheck = () => {
        animateHeader = document.body.scrollTop <= window.innerHeight
    }

    return (
        <div id="large-header" className={styles.largeHeader} ref={headerRef}>
            <canvas id="demo-canvas" ref={canvasRef}></canvas>
        </div>
    )
}

export default AnimatedHeader
