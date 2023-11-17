import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const DashboardLayout =({
    children
}: {
    children: React.ReactNode;
})=>{
    return(
        <div className="h-full relative bg-gradient-to-r from-purple-100 to-purple-200">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:fixed md:inset-y-0 z-[80] bg-gradient-to-r from-yellow-100 to-purple-100 ">
            <div>
                <Sidebar />
            </div>
            </div>
            <main className="md:pl-72">
                <Navbar />
                {children}
            </main>
        </div>
    );
}

export default DashboardLayout;