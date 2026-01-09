import React, { useState, useEffect } from 'react';
import { fetchArticles, createArticle, updateArticle, toggleArticleStatus } from '../../services/ArticleService';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button,
  Stack,
  Typography,
  Modal,
  Box,
  TextField,
  Switch,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: '#2d3748',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
  boxShadow: '0 18px 50px rgba(0, 0, 0, 0.3)',
  p: 4,
  color: '#ffffff',
};

function DashArticleListPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editArticleId, setEditArticleId] = useState(null);
  const [newArticle, setNewArticle] = useState({
    name: '',
    title: '',
    content: [],
    isActive: true,
  });

  const loadArticles = async () => {
    try {
      setLoading(true);
      const { data } = await fetchArticles();
      setArticles(data.articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleOpen = () => {
    setIsEditing(false);
    setNewArticle({
      name: '',
      title: '',
      category: '',
      image: '',
      content: [],
      isActive: true,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditArticleId(null);
  };

  const handleEdit = (id) => {
    const articleToEdit = articles.find((article) => article._id === id);
    if (articleToEdit) {
      setNewArticle(articleToEdit);
      setEditArticleId(id);
      setIsEditing(true);
      setOpen(true);
    }
  };

  const handleSaveArticle = async () => {
    try {
      if (isEditing) {
        await updateArticle(editArticleId, newArticle);
      } else {
        await createArticle(newArticle);
      }
      loadArticles();
      handleClose();
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleToggleActive = async (id) => {
    try {
      await toggleArticleStatus(id);
      loadArticles();
    } catch (error) {
      console.error('Error toggling article status:', error);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'category', headerName: 'Category', width: 150 },
    { 
      field: 'image', 
      headerName: 'Image', 
      width: 80,
      renderCell: (params) => (
        params.row.image ? (
          <img 
            src={params.row.image} 
            alt="preview" 
            style={{ width: 50, height: 35, objectFit: 'cover', borderRadius: 4 }} 
          />
        ) : 'No image'
      ),
    },
    {
      field: 'content',
      headerName: 'Content Preview',
      width: 200,
      renderCell: (params) => {
        const content = Array.isArray(params.row.content) 
          ? params.row.content[0] 
          : params.row.content;
        return content ? content.substring(0, 50) + '...' : '';
      },
    },
    {
      field: 'isActive',
      headerName: 'Active',
      width: 80,
      renderCell: (params) => (
        <Switch
          checked={params.row.isActive}
          onChange={() => handleToggleActive(params.row._id)}
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: '#a855f7',
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: '#a855f7',
            },
          }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button 
            variant="contained" 
            size="small" 
            onClick={() => handleEdit(params.row._id)}
            sx={{
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
              color: '#fff',
              '&:hover': {
                background: 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)',
              },
            }}
          >
            Edit
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ background: '#1f2937', minHeight: '100%' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h2" fontWeight='bold' sx={{ color: '#e5e7eb' }}>Articles</Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={handleOpen}
          sx={{
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
            color: '#fff',
            boxShadow: '0 15px 30px rgba(168, 85, 247, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 15px 32px rgba(168, 85, 247, 0.4)',
            },
          }}
        >
          Add Article
        </Button>
      </Stack>

      <DataGrid
        rows={articles}
        columns={columns}
        getRowId={(row) => row._id}
        loading={loading}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        disableSelectionOnClick
        sx={{
          background: '#2d3748 !important',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          color: '#fff',
          '& .MuiDataGrid-root': {
            background: '#2d3748 !important',
          },
          '& .MuiDataGrid-main': {
            background: '#2d3748 !important',
          },
          '& .MuiDataGrid-cell': {
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: '#e5e7eb',
            background: '#2d3748',
          },
          '& .MuiDataGrid-row': {
            background: '#2d3748 !important',
            '&:hover': {
              background: '#374151 !important',
            },
          },
          '& .MuiDataGrid-columnHeaders': {
            background: '#374151 !important',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
          },
          '& .MuiDataGrid-columnHeader': {
            background: '#374151 !important',
            color: '#fff',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            color: '#fff',
            fontWeight: 600,
          },
          '& .MuiDataGrid-footerContainer': {
            borderColor: 'rgba(255, 255, 255, 0.1)',
            background: '#374151 !important',
          },
          '& .MuiTablePagination-root': {
            color: '#fff',
          },
          '& .MuiDataGrid-virtualScroller': {
            background: '#2d3748 !important',
          },
          '& .MuiDataGrid-virtualScrollerContent': {
            background: '#2d3748 !important',
          },
          '& .MuiDataGrid-virtualScrollerRenderZone': {
            background: '#2d3748 !important',
          },
          '& .MuiDataGrid-overlayWrapper': {
            background: '#2d3748 !important',
          },
          '& .MuiDataGrid-overlay': {
            background: '#2d3748 !important',
            color: '#e5e7eb',
          },
          '& .MuiDataGrid-topContainer': {
            background: '#2d3748 !important',
          },
          '& .MuiDataGrid-filler': {
            background: '#2d3748 !important',
          },
          '& .MuiDataGrid-scrollbar': {
            background: '#2d3748 !important',
          },
          '& .MuiDataGrid-scrollbarFiller': {
            background: '#2d3748 !important',
          },
          '& .MuiDataGrid-withBorderColor': {
            borderColor: 'rgba(255, 255, 255, 0.1)',
          },
          '& .MuiDataGrid-container--top': {
            background: '#2d3748 !important',
          },
          '& .MuiDataGrid-container--bottom': {
            background: '#2d3748 !important',
          },
          '& > *': {
            background: '#2d3748',
          },
        }}
      />

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ color: '#e5e7eb', mb: 2 }}>{isEditing ? 'Edit Article' : 'Add Article'}</Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Name"
              value={newArticle.name}
              onChange={(e) => setNewArticle({ ...newArticle, name: e.target.value })}
              helperText="URL-friendly name (e.g., my-article-name)"
              sx={{
                '& .MuiInputLabel-root': { color: '#9ca3af' },
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                  '&:hover fieldset': { borderColor: '#a855f7' },
                  '&.Mui-focused fieldset': { borderColor: '#a855f7' },
                },
                '& .MuiFormHelperText-root': { color: '#9ca3af' },
              }}
            />
            <TextField
              label="Title"
              value={newArticle.title}
              onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
              sx={{
                '& .MuiInputLabel-root': { color: '#9ca3af' },
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                  '&:hover fieldset': { borderColor: '#a855f7' },
                  '&.Mui-focused fieldset': { borderColor: '#a855f7' },
                },
              }}
            />
            <TextField
              label="Category"
              value={newArticle.category || ''}
              onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
              helperText="e.g., Entertainment, Tech & Future, Business & Growth, Lifestyle"
              sx={{
                '& .MuiInputLabel-root': { color: '#9ca3af' },
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                  '&:hover fieldset': { borderColor: '#a855f7' },
                  '&.Mui-focused fieldset': { borderColor: '#a855f7' },
                },
                '& .MuiFormHelperText-root': { color: '#9ca3af' },
              }}
            />
            <TextField
              label="Image URL"
              value={newArticle.image || ''}
              onChange={(e) => setNewArticle({ ...newArticle, image: e.target.value })}
              helperText="Full URL to article image"
              sx={{
                '& .MuiInputLabel-root': { color: '#9ca3af' },
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                  '&:hover fieldset': { borderColor: '#a855f7' },
                  '&.Mui-focused fieldset': { borderColor: '#a855f7' },
                },
                '& .MuiFormHelperText-root': { color: '#9ca3af' },
              }}
            />
            <TextField
              label="Content"
              multiline
              rows={4}
              value={newArticle.content.join('\n')}
              onChange={(e) =>
                setNewArticle({ ...newArticle, content: e.target.value.split('\n') })
              }
              helperText="Each line becomes a paragraph"
              sx={{
                '& .MuiInputLabel-root': { color: '#9ca3af' },
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                  '&:hover fieldset': { borderColor: '#a855f7' },
                  '&.Mui-focused fieldset': { borderColor: '#a855f7' },
                },
                '& .MuiFormHelperText-root': { color: '#9ca3af' },
              }}
            />
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button 
              variant="outlined" 
              onClick={handleClose}
              sx={{
                borderColor: 'rgba(168, 85, 247, 0.5)',
                color: '#fff',
                '&:hover': {
                  borderColor: '#a855f7',
                  background: 'rgba(168, 85, 247, 0.1)',
                },
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleSaveArticle}
              sx={{
                background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                color: '#fff',
                '&:hover': {
                  background: 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)',
                },
              }}
            >
              {isEditing ? 'Save Changes' : 'Add'}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}

export default DashArticleListPage;