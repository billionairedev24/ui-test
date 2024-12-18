import React from 'react'
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from '../ui/dropdown-menu'
import { Link } from 'lucide-react'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const UserDropDown = () => {
  return (
      <div className="bg-background">
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                  <div className="flex items-center gap-2 p-2">
                      <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-0.5 leading-none">
                          <div className="font-semibold">John Doe</div>
                          <div className="text-sm text-muted-foreground">john@example.com</div>
                      </div>
                  </div>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                      <Link href="/" className="flex items-center gap-2">
                          <div className="h-4 w-4" />
                          <span>My Account</span>
                      </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                      <Link href="#" className="flex items-center gap-2">
                          <div className="h-4 w-4" />
                          <span>Orders</span>
                      </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                      <Link href="#" className="flex items-center gap-2">
                          <div className="h-4 w-4" />
                          <span>Logout</span>
                      </Link>
                  </DropdownMenuItem>
              </DropdownMenuContent>
          </DropdownMenu>
      </div>

  )
}

export default UserDropDown