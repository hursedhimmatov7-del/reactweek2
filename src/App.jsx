import React, { useRef, useState } from 'react'
import Card from './components/Card'
import Modal from './components/Modal'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import BasicSelect from './components/Select'

const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } }

const inputCls =
  'w-full rounded-lg border border-gray-300 px-3 py-2.5 text-[15px] outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100'

const saveBtnCls =
  'mt-2 w-full rounded-lg bg-blue-600 py-2.5 font-bold text-white shadow transition hover:bg-blue-700 active:scale-[0.98]'

const App = () => {
  const [data, setData] = useState([
    { id: 1, name: 'Alisher', age: 18, status: true, email: 'alisher12@gmail.com' },
    { id: 2, name: 'Valikul', age: 20, status: false, email: 'vali12@gmail.com' },
  ])

  const [editId, setEditId] = useState(null)
  const [infoId, setInfoId] = useState(null)
  const editData = data.find((u) => u.id === editId)
  const infoData = data.find((u) => u.id === infoId)

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('all')

  const addModal = useRef(null)
  const editModal = useRef(null)
  const infoModal = useRef(null)

  function dltUser(id) {
    setData((prev) => prev.filter((elem) => elem.id !== id))
  }

  const addSave = (e) => {
    e.preventDefault()
    const form = e.target
    const newUser = {
      id: Date.now(),
      name: form.name.value,
      age: Number(form.age.value),
      email: form.email.value,
      status: form.addSel.value === 'true',
    }
    setData((prev) => [...prev, newUser])
    addModal.current.close()
    form.reset()
  }

  function editShow(elem) {
    setEditId(elem.id)
    editModal.current.showModal()
  }

  const editSave = (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const age = Number(form.age.value)
    const email = form.email.value
    const status = form.editSel.value === 'true'

    setData((prev) =>
      prev.map((elem) =>
        elem.id === editId ? { ...elem, name, age, email, status } : elem
      )
    )
    editModal.current.close()
  }

  function infoShow(elem) {
    setInfoId(elem.id)
    infoModal.current.showModal()
  }

  function chekFunc(id) {
    setData((prev) =>
      prev.map((elem) =>
        elem.id === id ? { ...elem, status: !elem.status } : elem
      )
    )
  }

  const filteredData = data
    .filter((elem) =>
      elem.name.toLowerCase().includes(search.toLowerCase().trim())
    )
    .filter((elem) => {
      if (sort === 'true') return elem.status === true
      if (sort === 'false') return elem.status === false
      return true
    })

  return (
    <>
      <div className="flex w-325 m-auto my-15 items-center justify-between">
        <h1 className="text-4xl font-bold text-blue-600">Panel</h1>
        <div className="flex items-center gap-10">
          <Button
            sx={{ width: '100px', fontSize: '14px', fontWeight: 'bold' }}
            onClick={() => addModal.current.showModal()}
            variant="contained"
          >
            +Add
          </Button>
          <input
            className="w-60 outline-0 border border-gray-300 rounded-[6px] p-2 focus:border-2 focus:border-blue-500"
            type="search"
            placeholder="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <BasicSelect value={sort} onChange={(e) => setSort(e.target.value)} />
        </div>
      </div>

      <Modal close={() => addModal.current.close()} ModalName="Add" ref={addModal}>
        <form onSubmit={addSave} className="flex flex-col gap-3">
          <input className={inputCls} type="text" name="name" placeholder="Name" required />
          <input className={inputCls} type="number" name="age" placeholder="Age" required />
          <input className={inputCls} type="email" name="email" placeholder="Email" required />
          <select className={inputCls} name="addSel">
            <option value="false">offline</option>
            <option value="true">online</option>
          </select>
          <button className={saveBtnCls} type="submit">Save</button>
        </form>
      </Modal>

      <Modal close={() => editModal.current.close()} ModalName="Edit" ref={editModal}>
        <form
          onSubmit={editSave}
          key={`${editData?.id}-${editData?.status}`}
          className="flex flex-col gap-3"
        >
          <input className={inputCls} defaultValue={editData?.name} type="text" name="name" placeholder="Name" required />
          <input className={inputCls} defaultValue={editData?.age} type="number" name="age" placeholder="Age" required />
          <input className={inputCls} defaultValue={editData?.email} type="email" name="email" placeholder="Email" required />
          <select className={inputCls} defaultValue={String(editData?.status)} name="editSel">
            <option value="true">online</option>
            <option value="false">offline</option>
          </select>
          <button className={saveBtnCls} type="submit">Save</button>
        </form>
      </Modal>

      <Modal close={() => infoModal.current.close()} ModalName="Info" ref={infoModal}>
        <div className="flex flex-col items-center gap-1 pb-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white">
            {infoData?.name?.[0]?.toUpperCase()}
          </div>
          <p className="mt-2 text-xl font-bold">{infoData?.name}</p>
          <p className="text-gray-500">{infoData?.email}</p>
        </div>

        <div className="divide-y divide-gray-100 rounded-xl border border-gray-200 text-[15px]">
          <div className="flex justify-between px-4 py-3">
            <span className="text-gray-500">Age</span>
            <span className="font-semibold">{infoData?.age}</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-gray-500">Status</span>
            <span className={`badge ${infoData?.status ? 'online' : 'offline'}`}>
              {infoData?.status ? 'online' : 'offline'}
            </span>
          </div>
        </div>
      </Modal>

      <div>
        <Card>
          {filteredData.length === 0 && (
            <tr>
              <td colSpan={6}>Ничего не найдено</td>
            </tr>
          )}

          {filteredData.map((elem) => (
            <tr key={elem.id}>
              <td>{elem.id}</td>
              <td>
                <div className="flex gap-2 items-center">
                  <h1>{elem.name}</h1>
                  <Checkbox
                    checked={elem.status}
                    onChange={() => chekFunc(elem.id)}
                    size="small"
                    {...label}
                  />
                </div>
              </td>
              <td>
                <span className={`badge ${elem.status ? 'online' : 'offline'}`}>
                  {elem.status ? 'online' : 'offline'}
                </span>
              </td>
              <td>{elem.age}</td>
              <td>{elem.email}</td>
              <td>
                <div className="flex gap-2">
                  <button className="action-btn delete" onClick={() => dltUser(elem.id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <button className="action-btn edit" onClick={() => editShow(elem)}>
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button className="action-btn info" onClick={() => infoShow(elem)}>
                    <i className="fa-solid fa-circle-info"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </Card>
      </div>
    </>
  )
}

export default App