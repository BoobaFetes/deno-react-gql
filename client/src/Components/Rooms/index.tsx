import React, { FC, useState, MouseEventHandler } from "react"
import { Container, IconButton } from "@material-ui/core"
import { Save as SaveIcon } from "@material-ui/icons"
import { useQuery } from "@apollo/react-hooks"
import { Skeleton } from "@material-ui/lab"
import Room from "./Room"
import gql from "graphql-tag"
import { DocumentNode } from "graphql"
import { IRoom } from "../../Models"

const getRooms: DocumentNode = gql`
    query Rooms {
        rooms {
            id
            name
            persons
        }
    }`

const skeletonPlaceHolder = new Array(5).map((_, index) => <Skeleton key={index} variant="text" />)


const Rooms: FC = () => {
    const [newEntry, setNewEntry] = useState<IRoom>()
    const { loading, data, refetch } = useQuery<{ rooms: IRoom[] }>(getRooms)

    const onAdd: MouseEventHandler = e => {
        setNewEntry({ name: "", persons: [] })
    }
    const onCancel: MouseEventHandler = e => {
        setNewEntry(undefined)
    }

    return (
        <Container className="Rooms">
            {!newEntry && <IconButton onClick={onAdd}>
                <SaveIcon />
            </IconButton >
            }
            {newEntry && <Room {...newEntry} onRemove={onCancel} onRefresh={(variables) => {
                setNewEntry(undefined)
                return refetch(variables)
            }} />}
            {loading && skeletonPlaceHolder}
            {
                !loading && <>
                    {data?.rooms.map(i => <Room key={i.id} {...i} onRefresh={refetch} />)}
                </>
            }
        </Container >
    )
}

export default Rooms