import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FormAddBook } from "./FormAddBook";
// import { useState } from "react";

export function AddBookDrawer() {
    // const [drawerIsOpen,setDrawerIsOpen] = useState<boolean>(false)
  return (
    <Drawer>
      <DrawerTrigger className="bg-slate-950 text-white px-6 py-2 rounded-full shadow-lg">
        <button>Add Book</button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="py-3">Add New Book</DrawerTitle>
          <DrawerDescription className="mb-2">
            {/* This action cannot be undone. */}
            <FormAddBook/>
          </DrawerDescription>
        </DrawerHeader>
        {/* <DrawerFooter>
          <button>Submit</button>
          <DrawerClose>
            <button>Cancel</button>
          </DrawerClose>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
}
