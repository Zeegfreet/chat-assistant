import { AppList } from "@/components/AppList"
import { BoardLayout } from "@/layouts/boardLayout"

export const MainPage: React.FC = () => {

    return (
        <BoardLayout>
            <AppList />
        </BoardLayout>
    )
}