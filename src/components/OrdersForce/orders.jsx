
/*eslint-disable*/
export default function OrderForce({
    context,
    clickFunc,
    onSelect,
    selectedElement,
    id,
    selectable,
    deletable,
    refresh
    /*eslint-disable*/
}) {
    return (
        <tr onClick={clickFunc}>
            {/* numeration */}
            <td>{id + 1}</td>

            {Object.values(context)
                .map((e, i) => <td key={i}>{e}</td>)
            }
            {/* pencil */}
        </tr>
    )
}
