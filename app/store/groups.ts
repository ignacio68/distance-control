import Vue from 'Vue'

interface Group {
  id: string,
  color: string
}

const state = Vue.observable({
  groups: [
    {
      id: 'casa',
      color: '#31aec4'
      },
    {
      id: 'familia',
      color: '#a191ff'
      },
    {
      id: 'amigos',
      color: '#cc9633'
      },
    ],
})

const find = (id: string): Group => state.groups.find(group => group.id = id)
const remove = (id: string) => state.groups.filter(group => group.id = id)

export const getGroup = (id: string): Group => find(id)
export const getAllGroups = state.groups
export const setNewGroup = (group: Group) => state.groups.push(group)
export const deleteGroup = (id: string) => {
    // TODO: deploy the code
  const group = find(id)
  state.groups = remove(group.id)
}
