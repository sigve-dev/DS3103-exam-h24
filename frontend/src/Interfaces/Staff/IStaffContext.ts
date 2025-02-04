import IStaff from "./IStaff";

interface IStaffContext {
    staff: IStaff[];
    fetchStaff: () => Promise<void>;
    addStaff: (newMerch: IStaff) => Promise<void>;
    removeStaff: (id: number) => Promise<void>;
}

export default IStaffContext;
