import React, { FC, MouseEventHandler, useState, ChangeEventHandler } from "react"
import { TextField, Button, Box } from "@material-ui/core"
import { IRoom } from "../../../Models"
import { gql, ApolloQueryResult } from "apollo-boost"
import { useMutation } from "@apollo/react-hooks"

const upsertRoom = gql`
    mutation UpsertRoom($input: RoomInput!){
        upsertRoom(input: $input) {
            id
            name
            persons
        }
    }`

interface P extends IRoom {
    onRemove?: MouseEventHandler;
    onRefresh: (variables?: Record<string, any> | undefined) => Promise<ApolloQueryResult<{ rooms: IRoom[]; }>>;
}

const Room: FC<P> = ({ id, name, persons, onRemove, onRefresh }) => {
    const [entry, setEntry] = useState<IRoom>({ id, name, persons })
    const [mutateRoom] = useMutation<{ upsertRoom: IRoom }>(upsertRoom, {
        onCompleted: ({ upsertRoom }) => {
            console.log("there is a new entry", upsertRoom)
            onRefresh()
        }
    })

    const onChange: (field: keyof IRoom) => ChangeEventHandler<HTMLInputElement> =
        field => e => {
            setEntry({
                ...entry,
                [field]: field === "persons"
                    ? e.target.value.split(',').map(i => Number(i))
                    : e.target.value
            })
        }

    return (
        <form noValidate autoComplete="off" onSubmit={e => {
            e.preventDefault()
            mutateRoom({ variables: { input: entry } })
        }}>
            <Box className="Room" display="flex" flexGrow={1} flexWrap={1} flex="1 1 auto">
                <TextField id="room-id" label="id" disabled value={entry.id} />
                <TextField id="room-name" label="Filled" variant="outlined" fullWidth value={entry.name} onChange={onChange("name")} />
                <TextField id="room-persons" label="Outlined" variant="outlined" fullWidth value={entry.persons.join(',')} onChange={onChange("persons")} />
                <Button variant="text" color="primary" type="submit">Save</Button>
                <Button variant="text" color="secondary" onClick={onRemove}>X</Button>
            </Box>
        </form >
    )
}

export default Room