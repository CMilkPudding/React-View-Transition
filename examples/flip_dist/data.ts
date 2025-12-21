export interface IItem {
    id: string | number,
    desc: string,
    src: string
}

const CACHE_KEY = 'ListItems'
const getItems = (length: number = 100): IItem[] => {
    let data: any = localStorage.getItem(CACHE_KEY)
    if(data) {
        try {
            data = JSON.parse(data)
        } catch (error) {
            data = []
        }
    }

    if(!data?.length) {
         data = Array.from({ length }).map((_, i) => ({
            id: i,
            desc: `图片${i}`,
            src: `https://picsum.photos/seed/${Math.random()}/200/200`
        }))
        localStorage.setItem(CACHE_KEY, JSON.stringify(data))
    }

    return data as IItem[]
}

export const items: IItem[] = getItems()