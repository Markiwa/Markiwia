"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bell, Check, Trash2, Settings, MessageSquare, Heart, Package, Star, AlertCircle, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/layout/header';
import { BottomNav } from '@/components/layout/bottom-nav';

const notifications = [
  {
    id: '1',
    type: 'message',
    title: 'New message from Ali Electronics',
    description: 'Yes, the iPhone is still available...',
    time: '2 min ago',
    read: false,
    icon: MessageSquare,
    link: '/chat/1'
  },
  {
    id: '2',
    type: 'like',
    title: 'Someone liked your listing',
    description: 'Your iPhone 15 Pro Max got a new like',
    time: '1 hour ago',
    read: false,
    icon: Heart,
    link: '/product/1'
  },
  {
    id: '3',
    type: 'order',
    title: 'New order received',
    description: 'Fatima Khan ordered AirPods Pro',
    time: '3 hours ago',
    read: true,
    icon: Package,
    link: '/dashboard'
  },
  {
    id: '4',
    type: 'review',
    title: 'New review on your listing',
    description: 'Hassan gave you 5 stars',
    time: '1 day ago',
    read: true,
    icon: Star,
    link: '/profile'
  },
  {
    id: '5',
    type: 'system',
    title: 'Listing approved',
    description: 'Your MacBook Pro listing is now live',
    time: '2 days ago',
    read: true,
    icon: Check,
    link: '/product/2'
  },
  {
    id: '6',
    type: 'promo',
    title: 'Spin the wheel!',
    description: 'Daily spin available. Win discounts!',
    time: '2 days ago',
    read: true,
    icon: Gift,
    link: '/spin'
  },
];

export default function NotificationsPage() {
  const [notificationList, setNotificationList] = useState(notifications);

  const markAllRead = () => {
    setNotificationList(notificationList.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotificationList(notificationList.filter(n => n.id !== id));
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'message': return 'text-blue-500 bg-blue-500/10';
      case 'like': return 'text-red-500 bg-red-500/10';
      case 'order': return 'text-green-500 bg-green-500/10';
      case 'review': return 'text-amber-500 bg-amber-500/10';
      case 'promo': return 'text-purple-500 bg-purple-500/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  const unreadCount = notificationList.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-24 md:pb-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">Notifications</h1>
              {unreadCount > 0 && (
                <Badge>{unreadCount} new</Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={markAllRead}>
                <Check className="w-4 h-4 mr-2" />
                Mark all read
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-2">
              {notificationList.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                notificationList.map((notification, idx) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link href={notification.link}>
                      <div className={`flex items-start gap-4 p-4 rounded-xl border transition-colors hover:bg-muted/50 ${
                        !notification.read ? 'bg-primary/5 border-primary/20' : ''
                      }`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconColor(notification.type)}`}>
                          <notification.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{notification.title}</h3>
                            {!notification.read && (
                              <span className="w-2 h-2 rounded-full bg-primary" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{notification.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100"
                          onClick={(e) => {
                            e.preventDefault();
                            deleteNotification(notification.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </TabsContent>

            <TabsContent value="unread" className="space-y-2">
              {notificationList.filter(n => !n.read).map((notification, idx) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link href={notification.link}>
                    <div className="flex items-start gap-4 p-4 rounded-xl border bg-primary/5 border-primary/20 transition-colors hover:bg-muted/50">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconColor(notification.type)}`}>
                        <notification.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{notification.title}</h3>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="messages" className="space-y-2">
              {notificationList.filter(n => n.type === 'message').map((notification, idx) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link href={notification.link}>
                    <div className="flex items-start gap-4 p-4 rounded-xl border transition-colors hover:bg-muted/50">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconColor(notification.type)}`}>
                        <notification.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{notification.title}</h3>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="orders" className="space-y-2">
              {notificationList.filter(n => n.type === 'order').map((notification, idx) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link href={notification.link}>
                    <div className="flex items-start gap-4 p-4 rounded-xl border transition-colors hover:bg-muted/50">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconColor(notification.type)}`}>
                        <notification.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{notification.title}</h3>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
