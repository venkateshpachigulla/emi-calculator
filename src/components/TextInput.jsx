const TextInput = ({ title, state, setState }) => {
    return (
        <>
            <span className="title">{title}</span>
            <input
                type="number"
                title={title}
                value={state}
                onChange={(e) => setState(e.target.value)}
            />
        </>
    )
}

export default TextInput