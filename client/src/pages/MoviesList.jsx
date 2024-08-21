import React, { useEffect, useMemo, useState } from 'react'
import { useTable, usePagination } from 'react-table'
import api from '../api'
import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

const UpdateMovie = ({ id }) => {
    const updateUser = event => {
        event.preventDefault()
        window.location.href = `/movies/update/${id}`
    }

    return <Update onClick={updateUser}>Update</Update>
}

const DeleteMovie = ({ id }) => {
    const deleteUser = async event => {
        event.preventDefault()
        if (window.confirm(`Do you want to delete the movie ${id} permanently?`)) {
            await api.deleteMovieById(id)
            window.location.reload()
        }
    }

    return <Delete onClick={deleteUser}>Delete</Delete>
}

const MoviesList = () => {
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true)
            try {
                const response = await api.getAllMovies()
                setMovies(response.data.data)
            } catch (error) {
                console.error('Error fetching movies:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchMovies()
    }, [])

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: '_id', // Accessor for the ID
            },
            {
                Header: 'Name',
                accessor: 'name', // Accessor for the name
            },
            {
                Header: 'Rating',
                accessor: 'rating', // Accessor for the rating
            },
            {
                Header: 'Time',
                accessor: 'time', // Accessor for the time
                Cell: ({ value }) => <span>{value.join(' / ')}</span>, // Custom cell rendering
            },
            {
                Header: '',
                accessor: 'update', // Assign an accessor (could be anything as long as it's unique)
                Cell: ({ row }) => <UpdateMovie id={row.original._id} />,
            },
            {
                Header: '',
                accessor: 'delete', // Assign an accessor (could be anything as long as it's unique)
                Cell: ({ row }) => <DeleteMovie id={row.original._id} />,
            },
        ],
        []
    )

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
        { columns, data: movies },
        usePagination
    )

    return (
        <Wrapper>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </Wrapper>
    )
}

export default MoviesList

