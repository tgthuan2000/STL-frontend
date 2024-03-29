import { Feedback } from '~/@types/feedback'
import { service } from '~/services'

const getData = (data: Feedback): Feedback => {
    const { parent } = data

    return { ...data, parent: (parent ? { _id: parent._id } : null) as any }
}

const refactoredData = (data: Feedback[]) => {
    return data.reduce((acc, cur) => {
        acc.push(getData(cur))
        // if parent has parent, push parent to acc, if just parent._id => don't push
        if (cur.parent?.parent) {
            acc.push(getData(cur.parent))
        }
        return acc
    }, [] as Feedback[])
}

export const listToTree = (data: Feedback[]) =>
    service.listToTree<Feedback>(refactoredData(data), (item) => item.parent?._id)
