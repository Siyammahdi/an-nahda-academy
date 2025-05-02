"use client";

import React, { useEffect, useState } from 'react';
import { AdminAPI, AdminSettingDto } from '@/api/admin.api';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Edit, Plus, Loader2, Settings as SettingsIcon } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [settings, setSettings] = useState<AdminSettingDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState<AdminSettingDto | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    setting: '',
    value: '',
    description: ''
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fetch settings on component mount
  useEffect(() => {
    fetchSettings();
  }, []);
  
  // Fetch settings function
  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await AdminAPI.getSettings();
      setSettings(response.data);
      setError(null);
    } catch (error: any) {
      console.error('Error fetching settings:', error);
      setError(error.message || 'Failed to fetch settings');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle form input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Validate form data
  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.setting.trim()) {
      errors.setting = 'Setting name is required';
    }
    
    if (!formData.value.trim()) {
      errors.value = 'Value is required';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Reset form
  const resetForm = () => {
    setFormData({
      setting: '',
      value: '',
      description: ''
    });
    setFormErrors({});
  };
  
  // Open add setting dialog
  const openAddDialog = () => {
    resetForm();
    setIsAddDialogOpen(true);
  };
  
  // Open edit setting dialog
  const openEditDialog = (setting: AdminSettingDto) => {
    setSelectedSetting(setting);
    setFormData({
      setting: setting.setting,
      value: setting.value,
      description: setting.description
    });
    setFormErrors({});
    setIsEditDialogOpen(true);
  };
  
  // Handle add setting
  const handleAddSetting = async () => {
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      
      const response = await AdminAPI.updateSetting(formData.setting, {
        value: formData.value,
        description: formData.description
      });
      
      // Add to settings list if it doesn't exist, otherwise update
      const existingIndex = settings.findIndex(s => s.setting === formData.setting);
      if (existingIndex >= 0) {
        setSettings(prev => prev.map((s, i) => i === existingIndex ? response.data : s));
      } else {
        setSettings(prev => [...prev, response.data]);
      }
      
      // Close dialog
      setIsAddDialogOpen(false);
      
      // Show success message
      toast.success('Setting created successfully');
    } catch (error: any) {
      console.error('Error creating setting:', error);
      toast.error(error.message || 'Failed to create setting');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle update setting
  const handleUpdateSetting = async () => {
    if (!selectedSetting || !validateForm()) return;
    
    try {
      setIsSubmitting(true);
      
      const response = await AdminAPI.updateSetting(selectedSetting.setting, {
        value: formData.value,
        description: formData.description
      });
      
      // Update settings list
      setSettings(prev => 
        prev.map(setting => 
          setting._id === selectedSetting._id ? response.data : setting
        )
      );
      
      // Close dialog
      setIsEditDialogOpen(false);
      
      // Show success message
      toast.success('Setting updated successfully');
    } catch (error: any) {
      console.error('Error updating setting:', error);
      toast.error(error.message || 'Failed to update setting');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Settings</h1>
        
        <Button onClick={openAddDialog} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Setting
        </Button>
      </div>
      
      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {settings.length === 0 ? (
          <div className="col-span-full flex justify-center p-8 bg-gray-50 rounded-md border border-gray-200">
            <div className="text-center">
              <SettingsIcon className="mx-auto h-10 w-10 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No settings yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new setting.
              </p>
              <div className="mt-6">
                <Button onClick={openAddDialog}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Setting
                </Button>
              </div>
            </div>
          </div>
        ) : (
          settings.map((setting) => (
            <Card key={setting._id}>
              <CardHeader>
                <CardTitle>{setting.setting}</CardTitle>
                <CardDescription>{setting.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 break-words">{setting.value}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-xs text-gray-500">
                  Last updated: {format(new Date(setting.lastUpdated), 'PPp')}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditDialog(setting)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
      
      {/* Add Setting Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Setting</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="setting">Setting Name</Label>
              <Input
                id="setting"
                name="setting"
                value={formData.setting}
                onChange={handleInputChange}
                placeholder="Enter setting name (e.g. site.title)"
              />
              {formErrors.setting && (
                <p className="text-sm text-red-500">{formErrors.setting}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                name="value"
                value={formData.value}
                onChange={handleInputChange}
                placeholder="Enter value"
              />
              {formErrors.value && (
                <p className="text-sm text-red-500">{formErrors.value}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter description"
                rows={3}
              />
              {formErrors.description && (
                <p className="text-sm text-red-500">{formErrors.description}</p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddSetting}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Setting'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Setting Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Setting</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-setting">Setting Name</Label>
              <Input
                id="edit-setting"
                name="setting"
                value={formData.setting}
                disabled
                className="bg-gray-50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-value">Value</Label>
              <Input
                id="edit-value"
                name="value"
                value={formData.value}
                onChange={handleInputChange}
                placeholder="Enter value"
              />
              {formErrors.value && (
                <p className="text-sm text-red-500">{formErrors.value}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter description"
                rows={3}
              />
              {formErrors.description && (
                <p className="text-sm text-red-500">{formErrors.description}</p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateSetting}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Setting'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 