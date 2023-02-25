interface LButtonProps {
    text: string
    onClickFunc: () => void
    height?: string
}

function LButton({ text, onClickFunc, height }: LButtonProps) {
    return (
        <button
            className={`ml-3 rounded p-2 bg-gray-600 hover:bg-gray-500 text-gray-200 ${height}`}
            onClick={onClickFunc} >
            {text}
        </button>
    );
}

export default LButton;