import {Select} from "@chakra-ui/react";

function CommonSelect(props) {
    const data = props.data || [];

    return (
        <Select onChange={e => props.onChange(e)}>
            {
                data.map((item, i) => <option key={i} value={item._id}> { item.name } </option>)
            }
        </Select>
    )
}

export default CommonSelect