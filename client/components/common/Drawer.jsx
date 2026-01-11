"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useSelector } from "react-redux";

export function DrawerDemo() {
  const devTyping = useSelector(s => s.devmode?.user || []);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="flex flex-wrap gap-4 p-4">
          {devTyping.length > 0 ? (
            devTyping.map((dev, i) => (
              <div
                key={i}
                className="border rounded p-2 text-sm bg-muted"
              >
                <p><strong>User:</strong> {dev.user}</p>
                <p><strong>Socket:</strong> {dev.socketId}</p>
                <p><strong>Message:</strong> {dev.message}</p>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No dev typing data</p>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
