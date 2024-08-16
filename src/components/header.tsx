interface IHeader {
    text: string
}

export const Header = ({text}: IHeader) => {
    return (<h1>{text}</h1>)
}