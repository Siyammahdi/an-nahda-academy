"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DownloadCloud,
  Calendar,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Clock,
  Search,
  PlusCircle,
  Trash2,
  FileText,
  Filter,
  ChevronDown,
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPrice } from "@/lib/utils";

// Mock data for payments
const paymentHistory = [
  {
    id: "INV-2023-1001",
    date: "Apr 15, 2023",
    amount: 149.99,
    status: "completed",
    method: "Credit Card",
    items: ["Advanced Arabic for Quran Understanding"],
    cardLast4: "4242",
  },
  {
    id: "INV-2023-0897",
    date: "Mar 22, 2023",
    amount: 29.99,
    status: "completed",
    method: "PayPal",
    items: ["Arabic-English Dictionary of Quranic Terms"],
    cardLast4: null,
  },
  {
    id: "INV-2023-0742",
    date: "Feb 18, 2023",
    amount: 199.99,
    status: "refunded",
    method: "Credit Card",
    items: ["Introduction to Classical Arabic"],
    cardLast4: "5678",
  },
  {
    id: "INV-2023-0653",
    date: "Jan 10, 2023",
    amount: 249.99,
    status: "completed",
    method: "Credit Card",
    items: ["Foundations of Islamic Jurisprudence"],
    cardLast4: "4242",
  },
  {
    id: "INV-2022-1254",
    date: "Dec 05, 2022",
    amount: 19.99,
    status: "pending",
    method: "Bank Transfer",
    items: ["Islamic Spirituality - eBook"],
    cardLast4: null,
  },
];

const paymentMethods = [
  {
    id: 1,
    type: "Credit Card",
    brand: "Visa",
    last4: "4242",
    expiry: "04/25",
    isDefault: true,
  },
  {
    id: 2,
    type: "Credit Card",
    brand: "Mastercard",
    last4: "5678",
    expiry: "11/24",
    isDefault: false,
  },
];

const subscriptions = [
  {
    id: "SUB-2023-001",
    plan: "An-Nahda Academy Premium",
    status: "active",
    price: 19.99,
    billingCycle: "Monthly",
    nextBillingDate: "May 15, 2023",
    startDate: "Jan 15, 2023",
  },
];

// Helper function to get status badge variant
const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return {
        variant: "default" as const,
        icon: <CheckCircle2 className="h-3.5 w-3.5 mr-1" />,
      };
    case "pending":
      return {
        variant: "secondary" as const,
        icon: <Clock className="h-3.5 w-3.5 mr-1" />,
      };
    case "refunded":
      return {
        variant: "outline" as const,
        icon: <AlertCircle className="h-3.5 w-3.5 mr-1" />,
      };
    default:
      return {
        variant: "outline" as const,
        icon: null,
      };
  }
};

// Create custom DialogTrigger component
const DialogTrigger = ({ 
  children, 
  asChild = false
}: { 
  children: React.ReactNode; 
  asChild?: boolean 
}) => {
  return <>{children}</>;
};

const PaymentHistoryPage = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [addingCard, setAddingCard] = useState(false);

  // Filter payments based on search and status
  const filteredPayments = paymentHistory.filter((payment) => {
    const matchesSearch = 
      payment.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      payment.items.some(item => item.toLowerCase().includes(searchFilter.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Payment History</h1>
        <p className="text-muted-foreground">
          Manage your payments, invoices, and payment methods
        </p>
      </div>

      <Tabs defaultValue="history" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="history">Transaction History</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
        </TabsList>

        {/* Transaction History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Payment Records</CardTitle>
                <Button variant="outline" size="sm">
                  <DownloadCloud className="h-4 w-4 mr-2" /> Export
                </Button>
              </div>
              <CardDescription>
                A complete history of your payments and transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-between mb-4 gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search transactions..."
                    className="pl-8"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto -mx-1 sm:-mx-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Invoice</TableHead>
                        <TableHead className="w-[100px]">Date</TableHead>
                        <TableHead className="w-[90px]">Amount</TableHead>
                        <TableHead className="w-[100px]">Status</TableHead>
                        <TableHead className="w-[120px]">Method</TableHead>
                        <TableHead className="text-right w-[80px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                            No transactions found matching your criteria
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredPayments.map((payment) => {
                          const { variant, icon } = getStatusBadge(payment.status);
                          return (
                            <TableRow key={payment.id}>
                              <TableCell className="font-medium">{payment.id}</TableCell>
                              <TableCell className="whitespace-nowrap">{payment.date}</TableCell>
                              <TableCell>${payment.amount.toFixed(2)}</TableCell>
                              <TableCell>
                                <Badge variant={variant} className="flex items-center w-fit">
                                  {icon}
                                  <span className="capitalize">{payment.status}</span>
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <span className="whitespace-nowrap">{payment.method}</span>
                                  {payment.cardLast4 && (
                                    <span className="text-xs text-muted-foreground ml-1 hidden sm:inline">
                                      •••• {payment.cardLast4}
                                    </span>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                      <span className="sr-only">Open menu</span>
                                      <ChevronDown className="h-3.5 w-3.5" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem>
                                      <FileText className="h-3.5 w-3.5 mr-2" /> View Invoice
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <DownloadCloud className="h-3.5 w-3.5 mr-2" /> Download Receipt
                                    </DropdownMenuItem>
                                    {payment.status === "pending" && (
                                      <>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                          <AlertCircle className="h-3.5 w-3.5 mr-2" /> Cancel Payment
                                        </DropdownMenuItem>
                                      </>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Methods Tab */}
        <TabsContent value="methods">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Your Payment Methods</CardTitle>
                <Dialog open={addingCard} onOpenChange={setAddingCard}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Method
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add Payment Method</DialogTitle>
                      <DialogDescription>
                        Add a new credit card or payment method to your account
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="0000 0000 0000 0000"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name on Card</Label>
                        <Input id="name" placeholder="John Doe" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setAddingCard(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" onClick={() => setAddingCard(false)}>
                        Save Card
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <CardDescription>
                Manage your saved payment methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <Card key={method.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="mr-4 p-2 rounded-full bg-primary/10">
                            <CreditCard className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-base font-medium flex items-center">
                              {method.brand} •••• {method.last4}
                              {method.isDefault && (
                                <Badge variant="secondary" className="ml-2 text-xs">
                                  Default
                                </Badge>
                              )}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Expires {method.expiry}
                            </p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <span className="sr-only">Open menu</span>
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Card Actions</DropdownMenuLabel>
                            {!method.isDefault && (
                              <DropdownMenuItem>
                                <CheckCircle2 className="h-4 w-4 mr-2" /> Make Default
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <CreditCard className="h-4 w-4 mr-2" /> Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" /> Remove Card
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2 text-sm text-muted-foreground">
              <p className="flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                Your payment information is securely stored
              </p>
              <p className="flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                All transactions are encrypted and protected
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Subscriptions Tab */}
        <TabsContent value="subscriptions">
          <Card>
            <CardHeader>
              <CardTitle>Active Subscriptions</CardTitle>
              <CardDescription>
                Manage your recurring subscriptions and memberships
              </CardDescription>
            </CardHeader>
            <CardContent>
              {subscriptions.length === 0 ? (
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium">No active subscriptions</h3>
                  <p className="text-muted-foreground">
                    You don't have any active subscriptions at the moment.
                  </p>
                  <Button className="mt-4">Browse Plans</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {subscriptions.map((sub) => (
                    <Card key={sub.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{sub.plan}</CardTitle>
                            <CardDescription>
                              {sub.billingCycle} subscription
                            </CardDescription>
                          </div>
                          <Badge variant="default">{sub.status}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Amount</p>
                            <p className="font-medium">{formatPrice(sub.price, '৳')} / month</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Next billing</p>
                            <p className="font-medium">{sub.nextBillingDate}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Started on</p>
                            <p className="font-medium">{sub.startDate}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Payment method</p>
                            <p className="font-medium">Visa •••• 4242</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">Manage Plan</Button>
                        <Button variant="ghost" size="sm">Cancel Subscription</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentHistoryPage; 