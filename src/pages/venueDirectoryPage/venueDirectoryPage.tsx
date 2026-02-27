import {DefaultPageLayout} from "@/layouts/defaultPageLayout.tsx";
import {FilterMenu} from "@/components/filterMenu/filterMenu.tsx";

export const VenueDirectoryPage = () => {

    return <DefaultPageLayout>
        <DefaultPageLayout.Panel>
            <FilterMenu onFilter={(filters) => {console.log(filters)}} />
        </DefaultPageLayout.Panel>
        <DefaultPageLayout.Page>
            Meow!
        </DefaultPageLayout.Page>
    </DefaultPageLayout>;
}