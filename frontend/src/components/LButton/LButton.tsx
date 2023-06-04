interface LButtonProps {
    text: string
    onClickFunc: () => void
    height?: string
}

function LButton({ text, onClickFunc, height }: LButtonProps) {
    return (
        <button
            className={`ml-3 rounded p-2 bg-gradient-to-r
            from-indigo-900 via-purple-900 to-pink-900
            hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500
             text-gray-200 text-xl hover:text-slate-900
            hover:font-bold ${height}`}
            onClick={onClickFunc} >
            {text}
        </button>
    );
}

export default LButton;