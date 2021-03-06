import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
    { id: '1', date: '2011-10-05T14:48:00.000Z', title: 'First Post!', content: 'Hello!' , user: "0", reactions: {thumbsUp: 0, thumbsDown: 0, heart: 0, laugh: 0}},
    { id: '2', date: '2012-10-05T14:48:00.000Z', title: 'Second Post', content: 'More text', reactions: {thumbsUp: 0, thumbsDown: 0, heart: 0, laugh: 0}}
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId,
                        reactions: {thumbsUp: 0, thumbsDown: 0, heart: 0, laugh: 0}
                    }
                }
            }
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload
            const existingPost = state.find(post => post.id === id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload 
            const existingPost = state.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = state => state.postsSlice

export const selectPostById = (state, postId) => state.posts.find(post => post.id === postId)