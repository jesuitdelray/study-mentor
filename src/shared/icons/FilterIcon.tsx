import { SVGAttributes } from "react"

export function FilterIcon(props: SVGAttributes<SVGSVGElement>) {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M4 11C4 10.4477 4.44772 10 5 10H20.5C21.0523 10 21.5 10.4477 21.5 11C21.5 11.5523 21.0523 12 20.5 12H5C4.44772 12 4 11.5523 4 11Z"
                fill="#E0E3EC"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 9C22.8954 9 22 9.89543 22 11C22 12.1046 22.8954 13 24 13C25.1046 13 26 12.1046 26 11C26 9.89543 25.1046 9 24 9ZM20 11C20 8.79086 21.7909 7 24 7C26.2091 7 28 8.79086 28 11C28 13.2091 26.2091 15 24 15C21.7909 15 20 13.2091 20 11Z"
                fill="#E0E3EC"
            />
            <path
                d="M28 19C28 18.4477 27.5523 18 27 18H11.5C10.9477 18 10.5 18.4477 10.5 19C10.5 19.5523 10.9477 20 11.5 20H27C27.5523 20 28 19.5523 28 19Z"
                fill="#E0E3EC"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 17C9.10457 17 10 17.8954 10 19C10 20.1046 9.10457 21 8 21C6.89543 21 6 20.1046 6 19C6 17.8954 6.89543 17 8 17ZM12 19C12 16.7909 10.2091 15 8 15C5.79086 15 4 16.7909 4 19C4 21.2091 5.79086 23 8 23C10.2091 23 12 21.2091 12 19Z"
                fill="#E0E3EC"
            />
        </svg>
    )
}
