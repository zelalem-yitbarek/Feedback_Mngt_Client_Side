"use client"

import React, { useState, useEffect, createContext, useContext } from 'react'
import { notificationsAPI } from '@/lib/api/notifications'

interface NotificationsContextType {
  unreadCount: number
  refreshUnreadCount: () => Promise<void>
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [unreadCount, setUnreadCount] = useState(0)

  const refreshUnreadCount = async () => {
    try {
      const response = await notificationsAPI.getUnreadCount()
      const unreadNotifications = response.data.data?.notifications || []
      setUnreadCount(unreadNotifications.length)
    } catch (err: any) {
      console.error("Failed to fetch unread count:", err)
    }
  }

  useEffect(() => {
    refreshUnreadCount()
  }, [])

  return React.createElement(
    NotificationsContext.Provider,
    { value: { unreadCount, refreshUnreadCount } },
    children
  )
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider')
  }
  return context
} 