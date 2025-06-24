'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { CalendarIcon } from 'lucide-react';

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

import { AddEventSchema, AddEventSchemaType } from '../utils/add-event-schema';
import { User } from '../../../../mongodb/models/user';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import CustomSnackbar from '@/lib/Custom_Snackbar';
import { ResponseType } from '@/lib/Responses';

const AddEventCard = ({ setRefresh }: { setRefresh: Dispatch<SetStateAction<boolean>> }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<ResponseType>();

  const form = useForm<AddEventSchemaType>({
    resolver: zodResolver(AddEventSchema),
    defaultValues: {
      name: '',
      phone: '',
      type: '',
      date: '',
    },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/company/users');
        if (res.data.success) {
          setUsers(res.data.data.users);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const onSubmit = async (values: AddEventSchemaType) => {
    try {
      const res = await axios.post('/api/company/events', values);
      setResponse(res.data);
      if (res.data.success) {
        setRefresh((prev) => !prev);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResponse(undefined);
    }, 5000);

    return clearTimeout(timeout);
  }, [response]);

  return (
    <Dialog>
      {response && <CustomSnackbar response={response} />}
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-green-600 hover:bg-green-50 rounded-full cursor-pointer"
        >
          Өдөр нэмэх
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-[#F5F5F5] rounded-xl px-6 py-4">
        <DialogTitle className="text-lg font-semibold mb-4">Тэмдэглэлт өдөр нэмэх</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="border-none shadow-none bg-[#F5F5F5] p-0">
              <CardContent className="space-y-4 p-0">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Label>Нэр</Label>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full bg-background">
                            <SelectValue placeholder="Нэр" />
                          </SelectTrigger>
                          <SelectContent className="w-full">
                            {loading ? (
                              <div className="px-4 py-2 text-sm text-muted-foreground">
                                Уншиж байна...
                              </div>
                            ) : users.length > 0 ? (
                              users.map((user) => (
                                <SelectItem key={user._id} value={user.name}>
                                  {user.name}
                                </SelectItem>
                              ))
                            ) : (
                              <div className="px-4 py-2 text-sm text-muted-foreground">
                                Хэрэглэгч алга
                              </div>
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col sm:flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <Label>Утасны дугаар</Label>
                        <FormControl>
                          <Input
                            placeholder="Дугаар"
                            type="number"
                            {...field}
                            className="w-full bg-background"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <Label>Тэмдэглэлт өдөр</Label>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="w-full bg-background">
                              <SelectValue placeholder="Категори" />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                              <SelectItem value="birthday">Төрсөн өдөр</SelectItem>
                              <SelectItem value="anniversary">Компаны ой</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <Label>Өдөр сонгох</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                'w-full justify-start text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? format(new Date(field.value), 'yyyy/MM/dd') : 'Өдөр'}
                              <CalendarIcon className="ml-auto h-5 w-5 text-gray-400" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            disabled={(date) => date > new Date()}
                            mode="single"
                            selected={field.value ? new Date(field.value) : undefined}
                            onSelect={(date) => {
                              field.onChange(date?.toISOString() ?? '');
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>

              <CardFooter className="justify-end mt-4 p-0">
                <Button
                  disabled={form.formState.isSubmitting || !form.formState.isValid}
                  type="submit"
                  className="bg-black text-white px-6 cursor-pointer"
                >
                  Хадгалах
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventCard;
