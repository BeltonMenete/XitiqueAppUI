import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal, ModalFooter } from './Modal';

describe('Modal', () => {
  describe('Rendering', () => {
    it('should not render when isOpen is false', () => {
      render(
        <Modal isOpen={false} onClose={vi.fn()} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );
      expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    });

    it('should render when isOpen is true', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
      expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('should render with different sizes', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="Large Modal" size="lg">
          <p>Large content</p>
        </Modal>
      );
      expect(screen.getByText('Large Modal')).toBeInTheDocument();
    });

    it('should render ModalFooter children', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test Modal">
          <p>Content</p>
          <ModalFooter>
            <button type="button">Cancel</button>
            <button type="button">Submit</button>
          </ModalFooter>
        </Modal>
      );
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    it('should hide close button when showCloseButton is false', () => {
      const { container } = render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test Modal" showCloseButton={false}>
          <p>Content</p>
        </Modal>
      );
      const closeButton = container.querySelector('button[aria-label="Close"]');
      expect(closeButton).not.toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should call onClose when backdrop is clicked', () => {
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose} title="Test Modal">
          <p>Content</p>
        </Modal>
      );

      const backdrop = screen.getByLabelText('Close modal');
      fireEvent.click(backdrop);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when close button is clicked', () => {
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose} title="Test Modal">
          <p>Content</p>
        </Modal>
      );

      const closeButton = screen.getByLabelText('Close modal');
      fireEvent.click(closeButton);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('should have backdrop with aria-label', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test Modal">
          <p>Content</p>
        </Modal>
      );
      const backdrop = screen.getByLabelText('Close modal');
      expect(backdrop).toBeInTheDocument();
    });

    it('should prevent body scroll when open', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test Modal">
          <p>Content</p>
        </Modal>
      );
      expect(document.body.style.overflow).toBe('hidden');
    });
  });
});
