import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FormAddBook } from "./FormAddBook";
import { useState } from "react";

export function AddBookDrawer() {
    const [drawerIsOpen,setDrawerIsOpen] = useState<boolean>(false)
  return (
    <Drawer open={drawerIsOpen}>
      <DrawerTrigger>
        <button onClick={()=>setDrawerIsOpen(true)}> Add New Book </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add New Book</DrawerTitle>
          <DrawerDescription>
            {/* This action cannot be undone. */}
            <FormAddBook setDrawerIsOpen={setDrawerIsOpen}/>
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
